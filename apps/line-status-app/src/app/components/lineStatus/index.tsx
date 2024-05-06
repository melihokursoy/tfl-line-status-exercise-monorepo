import {
  LineStatusList,
  LoadingSpinner,
} from '@tfl-line-status-excersise-monorepo/ui';
import { useLineStatusQuery } from '../../queries/lineStatus';
import { useMemo } from 'react';
import { LineStatusApiresponseItem } from '../../types/lineStatusApiresponseItem';

export const LineStatus: React.FC = () => {
  const { isPending, isError, data, error } = useLineStatusQuery();

  const flattenedData = useMemo(
    () =>
      data
        ? data?.map((l: LineStatusApiresponseItem) => ({
            lineId: l.id,
            name: l.name,
            status: l.lineStatuses
              ?.map((s: any) => s.statusSeverityDescription)
              .join(', '),
          }))
        : undefined,
    [data]
  );

  return (
    <>
      <LoadingSpinner loading={isPending} />
      <LineStatusList items={flattenedData} />
      {isError ? (
        <div>
          <h1>{error.name}</h1>
          <p>{error.message}</p>
        </div>
      ) : null}
    </>
  );
};
