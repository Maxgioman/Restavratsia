using System;
using System.Collections.Generic;

namespace restavratsia1.Models
{
    public partial class Customcompany
    {
        public int Id { get; set; }
        public int PriceForWork { get; set; }
        public int CustomId { get; set; }
        public string CompanyId { get; set; }

        public virtual User Company { get; set; }
        public virtual Custom Custom { get; set; }
    }
}
