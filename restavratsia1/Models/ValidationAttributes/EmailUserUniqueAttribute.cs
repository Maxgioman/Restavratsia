using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;

namespace restavratsia1.Models.ValidationAttributes
{
    public class EmailUserUniqueAttribute : ValidationAttribute
    {
        protected override ValidationResult IsValid(
           object value, ValidationContext validationContext)
        {
            var _context = (mydbContext)validationContext.GetService(typeof(mydbContext));
            var mail = _context.Users.SingleOrDefault(e => e.Email == value.ToString());

            if (mail != null)
                return new ValidationResult(GetErrorMessage(value.ToString()));
            return ValidationResult.Success;
        }

        public string GetErrorMessage(string email)
        {
            return $"User with email {email} already exists.";
        }
    }
}