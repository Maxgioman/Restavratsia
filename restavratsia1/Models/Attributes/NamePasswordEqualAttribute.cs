using restavratsia1.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace restavratsia1.Models.Attributes
{
    public class NamePasswordEqualAttribute : ValidationAttribute
    {
        public NamePasswordEqualAttribute()
        {
            ErrorMessage = "Ім'я і пароль не повинні співпадати";
        }
        public override bool IsValid(object value)
        {
            var p = value as RegisterViewModel;

            if (p.Login == p.Password)
            {
                return false;
            }
            return true;
        }
    }
}
