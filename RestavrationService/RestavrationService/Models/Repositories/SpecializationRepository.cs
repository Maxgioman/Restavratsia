using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestavrationService.Models.Repositories
{
    public class SpecializationRepository : BaseRepository<Specialization>
    {
        public SpecializationRepository(mydbContext mydbcontext) : base(mydbcontext) { }
    }
}
