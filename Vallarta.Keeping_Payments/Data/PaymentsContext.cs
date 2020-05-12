using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vallarta.Keeping_Payments.Models;

namespace Vallarta.Keeping_Payments.Data
{
    public class PaymentsContext : DbContext
    {

        public PaymentsContext(DbContextOptions<PaymentsContext> options)
           : base(options)
        {
        }

        public DbSet<Payments> Payments { get; set; }


    }
}
