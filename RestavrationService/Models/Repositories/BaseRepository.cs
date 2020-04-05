using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RestavrationService.Models.Repositories
{
    public class BaseRepository<T> : IGenericRepository<T> where T : class
    {
        protected mydbContext mydbcontext;
        protected Microsoft.EntityFrameworkCore.DbSet<T> dbSet;
        public BaseRepository (mydbContext mydbcontext)
        {
            this.mydbcontext = mydbcontext;
            this.dbSet = mydbcontext.Set<T>();
        }
        public virtual void Create(T item)
        {
            this.dbSet.Add(item);
            this.mydbcontext.SaveChanges();
        }
        public void Clear()
        {
            this.dbSet.RemoveRange(this.dbSet);
        }
    }
}
