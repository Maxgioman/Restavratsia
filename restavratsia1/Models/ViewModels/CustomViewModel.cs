using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace restavratsia1.Models.ViewModels
{
    public class AddCustomViewModel
    {
        [Required(ErrorMessage = "Вкажіть заголовок")]
        [StringLength(50, ErrorMessage = "Занадто довгий заголовок")]
        public string Title { get; set; }

        [StringLength(500, ErrorMessage = "Занадто довгий тест")]
        public string Description { get; set; }
        [Required(ErrorMessage = "Вкажіть тип замовлення")]
        public string Specialization { get; set; }
        public string Image { get; set; }
        public string? FinalCompanyId { get; set; }
        public string UserId { get; set; }
    }
}
