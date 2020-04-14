using System;
using System.Collections.Generic;

namespace RestavrationService.Models
{
    public partial class Company
    {
        public Company()
        {
            CompanyReview = new HashSet<CompanyReview>();
            Companyspecialization = new HashSet<Companyspecialization>();
            Custom = new HashSet<Custom>();
            Customcompany = new HashSet<Customcompany>();
        }

        public int Id { get; set; }
        public string Login { get; set; }
        public string Pass { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Image { get; set; }

        public virtual ICollection<CompanyReview> CompanyReview { get; set; }
        public virtual ICollection<Companyspecialization> Companyspecialization { get; set; }
        public virtual ICollection<Custom> Custom { get; set; }
        public virtual ICollection<Customcompany> Customcompany { get; set; }
    }
}
