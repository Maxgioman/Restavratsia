using System;
using System.Collections.Generic;

namespace RestavrationService.Models
{
    public partial class Customcompany
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public int CustomId { get; set; }
        public int PriceForWork { get; set; }

        public virtual Company Company { get; set; }
        public virtual Custom Custom { get; set; }
    }
}
