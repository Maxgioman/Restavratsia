using System;
using System.Collections.Generic;

namespace restavratsia1.Models
{
    public partial class CompanyReview
    {
        public int Id { get; set; }
        public string Review { get; set; }
        public DateTime Date { get; set; }
        public int? Grade { get; set; }
        public string UserId { get; set; }
        public string CompanyId { get; set; }

        public virtual User Company { get; set; }
        public virtual User User { get; set; }
    }
}
