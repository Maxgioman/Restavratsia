using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using restavratsia1.Models;
using restavratsia1.Models.Repositories;
using restavratsia1.Models.ViewModels;
using MySql.Data.MySqlClient;

namespace restavratsia1.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdsController : Controller
    {
        private readonly CustomRepository repository;

        public AdsController(CustomRepository repository)
        {
            this.repository = repository;
        }

        // GET: api/Article
        [HttpGet("get_all/{id}")]
        public IActionResult GetAll(string id)
        {
            var listOfCustoms = repository.GetCustoms(id);
            if (listOfCustoms == null)
            {
                return NotFound("No customs");
            }
            return Ok(listOfCustoms);
        }

        [HttpGet("get_order/{id}")]
        public async Task<ActionResult<List<Custom>>> GetById(int id)
        {
            var custom = await repository.GetParticularCustom(id);
            if (custom == null)
            {
                return NotFound();
            }
            return Ok(custom);
        }
        // POST: api/Article
        [HttpPost("add")]
        public async Task<IActionResult> PostAsync([FromBody]AddCustomViewModel customModel)
        {
            var custom = new Custom()
            {
                CheckedByModer = 1,
                DateOfOrder = DateTime.Now,
                Title = customModel.Title,
                Description = customModel.Description,
                Image = customModel.Image,
                SpecializationSpecialization = customModel.Specialization,
                FinalCompanyId = null,
                UserId = customModel.UserId
            };
            await repository.PostCustom(custom);
            return CreatedAtAction(nameof(GetById), new { id = custom.Id }, custom);
        }

        // PUT: api/Article/5
        [HttpPut("alter/{id}")]
        public async Task<IActionResult> Put(int id, [FromBody]Custom custom)
        {
            await repository.UpdateCustom(custom, id);
            if (custom.Id != id)
            {
                return BadRequest();
            }
            string mySelectQuery = "update custom set title='" + custom.Title +
                                   "', description='" + custom.Description +
                                   "', image='" + custom.Image + "'" +
                                   "where id=" + custom.Id + ";";
            MySqlConnection myConnection = new MySqlConnection("Server=localhost;port=3306;user=root;password=root;database=mydb");
            MySqlCommand myCommand = new MySqlCommand(mySelectQuery, myConnection);
            myCommand.Connection.Open();
            myCommand.ExecuteReader();
            return NoContent();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deletedCustom = await repository.DeleteCustom(id);
            if(deletedCustom == null)
            {
                return NotFound();
            }
            return NoContent();
        }
    }
}
