using Microsoft.AspNetCore.Components;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using webapi.Models;
using UrlAttribute = System.ComponentModel.DataAnnotations;

namespace webapi.Controllers
{
    [System.Web.Http.Route("/Contact")]
    [ApiController]    
    public class ContactController : Controller
    {
        private ContactContext dbContact;

        public ContactController(ContactContext dbContact)
        {
            this.dbContact = dbContact;
        }

        [Microsoft.AspNetCore.Mvc.Route("ContactList")]
        [System.Web.Http.HttpGet]
        public IActionResult ContactList()
        {   
            return new JsonResult(this.dbContact.Contact.ToList());
        }

        [Microsoft.AspNetCore.Mvc.Route("AddContact")]
        [Microsoft.AspNetCore.Mvc.HttpPost]
        public ActionResult AddContact([Microsoft.AspNetCore.Mvc.FromBody] Contact contact)
        {
            this.dbContact.Contact.Add(contact);
            this.dbContact.SaveChanges();
            return new JsonResult("Created");
        }

        [Microsoft.AspNetCore.Mvc.Route("UpdateContact")]
        [Microsoft.AspNetCore.Mvc.HttpPost]
        public IActionResult UpdateContact([System.Web.Http.FromBody] Contact contact)
        {
            var filterData = this.dbContact.Contact.Where(x=> x.Id == contact.Id).FirstOrDefault();
            if(filterData == null)
            {
                return new JsonResult("Contact details not found");
            }
            this.dbContact.Contact.Remove(filterData);
            this.dbContact.Contact.Add(contact);
            this.dbContact.SaveChangesAsync();
            return new JsonResult("Updated");
        }

        [Microsoft.AspNetCore.Mvc.Route("DeleteContact")]
        [Microsoft.AspNetCore.Mvc.HttpGet]
        public IActionResult DeleteContact([System.Web.Http.FromUri] int id)
        {
            var filterData = this.dbContact.Contact.Where(x => x.Id == id).FirstOrDefault();
            if (filterData == null)
            {
                return new JsonResult("Contact details not found");
            }
            this.dbContact.Contact.Remove(filterData);
            this.dbContact.SaveChangesAsync();
            return new JsonResult("Deleted");
        }
    }
}
