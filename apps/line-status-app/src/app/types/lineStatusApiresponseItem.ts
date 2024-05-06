// To parse this data:
//
//   import { Convert } from "./file";
//
//   const lineStatusApiresponseItem = Convert.toLineStatusApiresponseItem(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface LineStatusApiresponseItem {
    $type:         string;
    id:            string;
    name:          string;
    modeName:      ModeName;
    disruptions:   any[];
    created:       Date;
    modified:      Date;
    lineStatuses:  LineStatus[];
    routeSections: any[];
    serviceTypes:  ServiceType[];
    crowding:      Crowding;
}

export interface Crowding {
    $type: string;
}

export interface LineStatus {
    $type:                     string;
    id:                        number;
    lineId:                    string;
    statusSeverity:            number;
    statusSeverityDescription: StatusSeverityDescription;
    reason:                    string;
    created:                   Date;
    validityPeriods:           ValidityPeriod[];
    disruption:                Disruption;
}

export interface Disruption {
    $type:               string;
    category:            Category;
    categoryDescription: Category;
    description:         string;
    affectedRoutes:      any[];
    affectedStops:       any[];
    closureText:         ClosureText;
}

export enum Category {
    RealTime = "RealTime",
}

export enum ClosureText {
    ServiceClosed = "serviceClosed",
}

export enum StatusSeverityDescription {
    ServiceClosed = "Service Closed",
}

export interface ValidityPeriod {
    $type:    string;
    fromDate: Date;
    toDate:   Date;
    isNow:    boolean;
}

export enum ModeName {
    Tube = "tube",
}

export interface ServiceType {
    $type: string;
    name:  Name;
    uri:   string;
}

export enum Name {
    Night = "Night",
    Regular = "Regular",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toLineStatusApiresponseItem(json: string): LineStatusApiresponseItem[] {
        return cast(JSON.parse(json), a(r("LineStatusApiresponseItem")));
    }

    public static lineStatusApiresponseItemToJson(value: LineStatusApiresponseItem[]): string {
        return JSON.stringify(uncast(value, a(r("LineStatusApiresponseItem"))), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "LineStatusApiresponseItem": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "id", js: "id", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "modeName", js: "modeName", typ: r("ModeName") },
        { json: "disruptions", js: "disruptions", typ: a("any") },
        { json: "created", js: "created", typ: Date },
        { json: "modified", js: "modified", typ: Date },
        { json: "lineStatuses", js: "lineStatuses", typ: a(r("LineStatus")) },
        { json: "routeSections", js: "routeSections", typ: a("any") },
        { json: "serviceTypes", js: "serviceTypes", typ: a(r("ServiceType")) },
        { json: "crowding", js: "crowding", typ: r("Crowding") },
    ], false),
    "Crowding": o([
        { json: "$type", js: "$type", typ: "" },
    ], false),
    "LineStatus": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "id", js: "id", typ: 0 },
        { json: "lineId", js: "lineId", typ: "" },
        { json: "statusSeverity", js: "statusSeverity", typ: 0 },
        { json: "statusSeverityDescription", js: "statusSeverityDescription", typ: r("StatusSeverityDescription") },
        { json: "reason", js: "reason", typ: "" },
        { json: "created", js: "created", typ: Date },
        { json: "validityPeriods", js: "validityPeriods", typ: a(r("ValidityPeriod")) },
        { json: "disruption", js: "disruption", typ: r("Disruption") },
    ], false),
    "Disruption": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "category", js: "category", typ: r("Category") },
        { json: "categoryDescription", js: "categoryDescription", typ: r("Category") },
        { json: "description", js: "description", typ: "" },
        { json: "affectedRoutes", js: "affectedRoutes", typ: a("any") },
        { json: "affectedStops", js: "affectedStops", typ: a("any") },
        { json: "closureText", js: "closureText", typ: r("ClosureText") },
    ], false),
    "ValidityPeriod": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "fromDate", js: "fromDate", typ: Date },
        { json: "toDate", js: "toDate", typ: Date },
        { json: "isNow", js: "isNow", typ: true },
    ], false),
    "ServiceType": o([
        { json: "$type", js: "$type", typ: "" },
        { json: "name", js: "name", typ: r("Name") },
        { json: "uri", js: "uri", typ: "" },
    ], false),
    "Category": [
        "RealTime",
    ],
    "ClosureText": [
        "serviceClosed",
    ],
    "StatusSeverityDescription": [
        "Service Closed",
    ],
    "ModeName": [
        "tube",
    ],
    "Name": [
        "Night",
        "Regular",
    ],
};
