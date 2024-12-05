import axios from 'axios';
import useSWR from 'swr';

export const usePhoneNumbers = (filters: {positionCriteria: Record<number, string>; includePatterns: string[]; excludeNumbers: string[]; targetSum?: number}) => {
  const query = new URLSearchParams();

  // Add positionCriteria as a JSON string
  query.append('positionCriteria', JSON.stringify(filters.positionCriteria));

  // Add other filters
  if (filters.includePatterns.length > 0) {
    query.append('includePatterns', filters.includePatterns.join(','));
  }

  if (filters.excludeNumbers.length > 0) {
    query.append('excludeNumbers', filters.excludeNumbers.join(','));
  }

  if (filters.targetSum !== undefined) {
    query.append('targetSum', filters.targetSum.toString());
  }

  const {data, error} = useSWR(`/api/phone-numbers?${query.toString()}`, async (url) => {
    const response = await axios.get(url);
    return response.data;
  });

  return {
    phoneNumbers: data?.data || [],
    isLoading: !error && !data,
    error,
  };
};
