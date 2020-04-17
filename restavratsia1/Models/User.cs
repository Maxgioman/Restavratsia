using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace restavratsia1.Models
{
    public partial class User : IdentityUser
    {
        public User()
        {
            CompanyReviewCompany = new HashSet<CompanyReview>();
            CompanyReviewUser = new HashSet<CompanyReview>();
            CustomFinalCompany = new HashSet<Custom>();
            CustomUser = new HashSet<Custom>();
            Customcompany = new HashSet<Customcompany>();
        }

        public string Login { get; set; }
        public string Pass { get; set; }
        public string Name { get; set; }
        public sbyte IsCompany { get; set; }
        public string Phone { get; set; }
        public string Image { get; set; }

        public virtual ICollection<CompanyReview> CompanyReviewCompany { get; set; }
        public virtual ICollection<CompanyReview> CompanyReviewUser { get; set; }
        public virtual ICollection<Custom> CustomFinalCompany { get; set; }
        public virtual ICollection<Custom> CustomUser { get; set; }
        public virtual ICollection<Customcompany> Customcompany { get; set; }
    }
}
