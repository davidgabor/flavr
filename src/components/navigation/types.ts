export type SearchResult = {
  id: string;
  name: string;
  description?: string;
  resultType: 'destination' | 'recommendation';
  type?: string;
  destination_name?: string;
};