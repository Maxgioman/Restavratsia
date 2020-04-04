using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestavrationService.Models.Repositories
{
    public class CompanyReviewRepository : BaseRepository<CompanyReview>
    {
        public CompanyReviewRepository(mydbContext mydbcontext) : base(mydbcontext) { }
    }
}
