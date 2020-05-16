using System;
using System.Collections.Generic;

namespace restavratsia1.Models
{
    public partial class Custom
    {
        public Custom()
        {
            Customcompany = new HashSet<Customcompany>();
        }

        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public byte CheckedByModer { get; set; }
        public DateTime DateOfOrder { get; set; }
        public string UserId { get; set; }
        public string? FinalCompanyId { get; set; }
        public string SpecializationSpecialization { get; set; }
        public string Image { get; set; }

        public virtual User FinalCompany { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Customcompany> Customcompany { get; set; }
    }
}
