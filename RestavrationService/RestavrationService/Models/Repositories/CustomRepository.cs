using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestavrationService.Models.Repositories
{
    public class CustomRepository : BaseRepository<Custom>
    {
        public CustomRepository(mydbContext mydbcontext) : base(mydbcontext) { }
    }
}
