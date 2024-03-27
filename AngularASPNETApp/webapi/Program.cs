using Microsoft.EntityFrameworkCore;
using webapi.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddMvc();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<ContactContext>(db => db.UseInMemoryDatabase("ContactDB"));

//builder.Services.AddCors(op =>
//{
    
//    op.AddPolicy("_myAllowSpecificOrigins", builder =>
//    {
//        builder.WithOrigins("http://localhost:5228", "http://localhost:4200")
//               .AllowAnyOrigin()        
//               .AllowAnyHeader()
//               .AllowAnyMethod();
//    });
//});

var app = builder.Build();

//app.MapGet("/ContactList", 
//    async (ContactContext dbContact) => await dbContact.Contacts.ToListAsync());

//app.MapPost("/AddContact",
//    async (ContactContext dbContact,[FromBody] Contact contact) =>
//    {
//        dbContact.Contacts.Add(contact);
//        await dbContact.SaveChangesAsync();
//        return Results.Ok("Created");
//    });

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

//app.UseCors("_myAllowSpecificOrigins");
app.UseCors(x=> x.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod());
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
