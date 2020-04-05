using System;
using System.Collections.Generic;

namespace RestavrationService.Models
{
    public partial class Specialization
    {
        public Specialization()
        {
            Companyspecialization = new HashSet<Companyspecialization>();
        }

        public string Specialization1 { get; set; }

        public virtual ICollection<Companyspecialization> Companyspecialization { get; set; }
    }
}
