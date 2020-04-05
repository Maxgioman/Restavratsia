using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestavrationService.Models.Repositories
{
    public class CustomCompanyRepository : BaseRepository<Customcompany>
    {
        public CustomCompanyRepository(mydbContext mydbcontext) : base(mydbcontext) { }
    }
}
