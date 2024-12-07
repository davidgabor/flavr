export type SearchResult = {
  id: string;
  name: string;
  description?: string;
  type?: string;
  resultType: 'destination' | 'recommendation';
  destination_name?: string;
};