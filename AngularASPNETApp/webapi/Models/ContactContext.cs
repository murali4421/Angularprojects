using Microsoft.EntityFrameworkCore;

namespace webapi.Models
{
    public class ContactContext : DbContext
    {
        public ContactContext(DbContextOptions dbContext) : base(dbContext) { }

        public DbSet<Contact> Contacts { get; set; }
    }
}
