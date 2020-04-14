using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestavrationService.Models.Repositories
{
    public class CompanySpecializationRepository : BaseRepository<Companyspecialization>
    {
        public CompanySpecializationRepository(mydbContext mydbcontext) : base(mydbcontext) { }
    }
}
