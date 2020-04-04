namespace RestavrationService.Models.Repositories
{
    public interface IGenericRepository<T> where T : class
    {
        void Create(T corpus);
        void Clear();
    }
}
