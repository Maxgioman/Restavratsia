using System;
using System.Collections.Generic;

namespace RestavrationService.Models
{
    public partial class User
    {
        public User()
        {
            CompanyReview = new HashSet<CompanyReview>();
            Custom = new HashSet<Custom>();
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
        public virtual ICollection<Custom> Custom { get; set; }
    }
}
