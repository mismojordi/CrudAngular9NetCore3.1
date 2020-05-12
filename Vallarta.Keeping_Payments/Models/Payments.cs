using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Vallarta.Keeping_Payments.Models
{
    public class Payments
    {
        [Key]
        public int PaymentId { get; set; }
        [Required]
        public DateTime PaymentDate { get; set; }
        public string PaymentDesciption { get; set; }
        [Required]
        public double PaymentAmount { get; set; }
    
    }
}
