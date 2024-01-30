export const SUMMARY = `
  SELECT 
  (SELECT COUNT(*) FROM funds) AS fundsQty,
  (SELECT COUNT(*) FROM blocks) As blocksQty;
`;