using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using restavratsia1.Models;
using Microsoft.AspNetCore.Identity;
using restavratsia1.Models.ViewModels;
using System.Web.Http;
using System.Web.Http.Results;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Collections;

namespace restavratsia1.Controllers
{
    public class AuthFailedRequestData
    {
        public IEnumerable<IdentityError> Errors { get; set; }
    }

    public class AuthFailedResponse
    {
        public string Message { get; set; }
        public IDictionary Data { get; set; }
    }


    [Microsoft.AspNetCore.Mvc.ApiController]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager)
        {
            _userManager = userManager;
            _signInManager = signInManager;
        }

        //[Microsoft.AspNetCore.Mvc.HttpGet]
        //public OkResult GetMeth()
        //{
        //    return Ok();
        //}

        [Microsoft.AspNetCore.Mvc.HttpPost]
        [Microsoft.AspNetCore.Mvc.Route("register")]
        public async Task<IActionResult> Register([Microsoft.AspNetCore.Mvc.FromBody] RegisterViewModel model)
        {
            // var wrap = new Wrapper();
            if (ModelState.IsValid)
            {
                string name = (model.IsCompany == 0) ? model.Name + " " + model.Surname : model.Name;
                var user = new User()
                {
                    Email = model.Email,
                    Login = model.Login,
                    Pass = model.Password,
                    Name =  name,
                    Phone = model.Phone,
                    IsCompany = model.IsCompany,
                    UserName = model.Login
                };
                try
                {
                    //string mySelectQuery = "SELECT UserName,login FROM user;";
                    //MySqlConnection myConnection =
                    //new MySqlConnection("Server=localhost; port = 3306 ;user=root;password=leomessi1021;database=mydb");
                    //MySqlCommand myCommand = new MySqlCommand(mySelectQuery, myConnection);
                    //myCommand.Connection.Open();
                    //var ob = myCommand.ExecuteReader();
                    //var arr = new List<string>();
                    //while (ob.Read())
                    //{
                    //    arr.Add(ob[0].ToString() + "---" + ob[1].ToString());
                    //}
                    var result = _userManager.CreateAsync(user, model.Password).Result; //);
                    if (result.Succeeded)
                    {
                        _signInManager.SignInAsync(user, false).Wait();
                        return Ok(user);
                    }
                    //return new ExceptionResult(new Exception(result.Errors.ToString()), this);//
                    return BadRequest(new AuthFailedRequestData
                    {
                        Errors = result.Errors
                    });
                }
                catch (MySqlException ex)
                {
                    return BadRequest(new AuthFailedResponse
                    {
                        Message = ex.Message,
                        Data = ex.Data
                    });
                }
                catch (Exception)
                {
                    return BadRequest(new AuthFailedResponse
                    {
                        Message = "Something went wrong"
                    });
                }
            }
            return BadRequest(ModelState);
        }

        [Microsoft.AspNetCore.Mvc.HttpPost]
        [Microsoft.AspNetCore.Mvc.Route("login")]
        public async Task<IActionResult> Login([Microsoft.AspNetCore.Mvc.FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                var result = await _signInManager.PasswordSignInAsync(model.Login,model.Password,model.RememberMe,false);
                
                if(result.Succeeded)
                {
                    return Ok();
                }
                return BadRequest(new AuthFailedResponse
                {
                    Message = "Invalid Login Attempt.Configuration of login and password is not valid"
                });
            }
            return BadRequest(ModelState);
        }
    }
    

    //class Wrapper : ApiController
    //{
    //    public IHttpActionResult MakeJson(User modelObject)
    //    {
    //        return Json(modelObject);
    //    }
    //    public IHttpActionResult ReturnExceptionResult(Exception ex)
    //    {
    //        return new ExceptionResult(ex, this);
    //    }
    //    public IHttpActionResult request(Microsoft.AspNetCore.Mvc.ModelBinding.ModelStateDictionary ob)
    //    {
    //        return BadRequest(ModelState);
    //    }
    //}
}

//{

//};

