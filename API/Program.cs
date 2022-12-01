
using API.DTOs;
using API.Interfaces;
using API;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
//builder.Services.Add
//Add DataContext and connect with SQL Server 
//builder.Services.AddDbContext<ConexionSqlServer>(options => options.UseMySQL(builder.Configuration.GetConnectionString("SqlConnection")));
builder.Services.AddSingleton(new MySqlConfiguration(builder.Configuration.GetConnectionString("SqlConnection")));
builder.Services.AddScoped<IAppUsers, AppUserDTO>();
var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
