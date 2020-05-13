using restavratsia1.Models.Attributes;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using restavratsia1.Models.ValidationAttributes;

namespace restavratsia1.Models.ViewModels
{
    public class EditUserViewModel
    {
        [Required(ErrorMessage = "Не вказано id")]
        public string Id { get; set; }

        [Required(ErrorMessage = "Не вказано імені користувача")]
        [StringLength(25, MinimumLength = 8, ErrorMessage = "Довжина логіну повинна бути від 8 до 25 символів")]
        public string Login { get; set; }

        [Required(ErrorMessage = "Вкажіть пароль")]
        [DataType(DataType.Password)]
        [StringLength(16, MinimumLength = 8, ErrorMessage = "Довжина паролю повинна бути від 8 до 16 символів")]
        public string Password { get; set; }


        [Required(ErrorMessage = "Не вказано поштової скриньки користувача")]
        [EmailAddress(ErrorMessage = "Invalid Email Address")]
        [EmailUserUnique]
        public string Email { get; set; }

        [Required(ErrorMessage = "Не вказано Ваше ім'я")]
        [StringLength(40, MinimumLength = 2, ErrorMessage = "Ім'я повинно становити від 2 до 40 букв")]
        public string Name { get; set; }

        public string Surname { get; set; }

        [Required(ErrorMessage = "Вас не ідентифіковано")]
        public sbyte IsCompany { get; set; }

        [StringLength(13, ErrorMessage = "Телефон повинен становити 13 символів")]
        public string Phone { get; set; }
    }
}