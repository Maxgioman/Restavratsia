using restavratsia1.Models.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace restavratsia1.Models.ViewModels
    {
        public class EditPassViewModel
        {
            [Required(ErrorMessage = "Вкажіть пароль")]
            [DataType(DataType.Password)]
            [StringLength(16, MinimumLength = 8, ErrorMessage = "Довжина паролю повинна бути від 8 до 16 символів")]
            public string OldPassword { get; set; }

            [Required(ErrorMessage = "Вкажіть пароль")]
            [DataType(DataType.Password)]
            [StringLength(16, MinimumLength = 8, ErrorMessage = "Довжина паролю повинна бути від 8 до 16 символів")]
            public string NewPassword { get; set; }

            [Required(ErrorMessage = "Підтвердіть пароль")]
            [Compare("NewPassword", ErrorMessage = "Паролі не співпадають")]
            [DataType(DataType.Password)]
            public string NewPasswordConfirm { get; set; }
        }
    }


