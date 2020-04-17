using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace restavratsia1.Models.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Не вказано імені користувача")]
        [StringLength(25, MinimumLength = 8, ErrorMessage = "Довжина логіну повинна бути від 8 до 25 символів")]
        public string Login { get; set; }
       
        [Required(ErrorMessage = "Вкажіть пароль")]
        [DataType(DataType.Password)]
        [StringLength(16, MinimumLength = 8, ErrorMessage = "Довжина паролю повинна бути від 8 до 16 символів")]
        public string Password { get; set; }

        public bool RememberMe { get; set; }

    }
}
