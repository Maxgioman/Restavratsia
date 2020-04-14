using System;
using System.Collections.Generic;

namespace RestavrationService.Models
{
    public partial class Companyspecialization
    {
        public int Id { get; set; }
        public int Companyid { get; set; }
        public string Specialization { get; set; }

        public virtual Company Company { get; set; }
        public virtual Specialization SpecializationNavigation { get; set; }
    }
}
