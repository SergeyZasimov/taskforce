export interface CRUDRepository<E, I, R> {
  findById(id: I): Promise<R> | null;
  create(entity: E): Promise<R>;
  update(id: I, entity: E): Promise<R> | null;
  delete(id: I): Promise<void> | null;
}
