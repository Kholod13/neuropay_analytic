import type { DataRecord } from '@/shared/types';

export async function wait (duration: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, duration));
}

export function mapDataRecordsById <T extends DataRecord> (records: T[]): Record<DataRecord['id'], T> {
    return Object.fromEntries(records.map(record => [record.id, record]));
}
