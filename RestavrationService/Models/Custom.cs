using System;
using System.Collections.Generic;

namespace RestavrationService.Models
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
        public sbyte CheckedByModer { get; set; }
        public DateTime DateOfOrder { get; set; }
        public int UserId { get; set; }
        public int? FinalCompanyId { get; set; }

        public virtual Company FinalCompany { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Customcompany> Customcompany { get; set; }
    }
}
