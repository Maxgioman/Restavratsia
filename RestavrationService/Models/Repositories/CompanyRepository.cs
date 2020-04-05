using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestavrationService.Models.Repositories
{
    public class CompanyRepository : BaseRepository<Company>
    {
        public CompanyRepository(mydbContext mydbcontext) : base(mydbcontext){}
    }
}
