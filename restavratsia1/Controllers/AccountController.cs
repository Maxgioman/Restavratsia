using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using restavratsia1.Models;
using Microsoft.AspNetCore.Identity;
using restavratsia1.Models.ViewModels;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using System.Collections;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using System.Web.Helpers;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;

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

    //private List<User> users = new List<User>;

    [Microsoft.AspNetCore.Mvc.ApiController]
    [Microsoft.AspNetCore.Mvc.Route("api/[controller]")]
    public class AccountController : Controller
    {
        private readonly Microsoft.AspNetCore.Identity.UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly ILogger<AccountController> logger;

        public AccountController(Microsoft.AspNetCore.Identity.UserManager<User> userManager, SignInManager<User> signInManager, ILogger<AccountController> logger)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            this.logger = logger;
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
                /*WebImage photo = WebImage.GetImageFromRequest();
                var newFileName = "";
                var imagePath = "";
                var imageThumbPath = "";
                if (photo != null)
                {
                    newFileName = Guid.NewGuid().ToString() + "_" + System.IO.Path.GetFileName(photo.FileName);
                    imagePath = @"UploadImages\Users\" + newFileName;
                    photo.Save(@"~\" + imagePath);
                    imageThumbPath = @"images\thumbs\" + newFileName;
                    photo.Resize(width: 60, height: 60, preserveAspectRatio: true,
                       preventEnlarge: true);
                    photo.Save(@"~\" + imageThumbPath);
                }*/
                var user = new User()
                {
                    Email = model.Email,
                    Login = model.Login,
                    Pass = model.Password,
                    Name = name,
                    Phone = model.Phone,
                    IsCompany = model.IsCompany,
                    UserName = model.Login,
                    //Image = imageThumbPath
                };
                try
                {
                    var result = _userManager.CreateAsync(user, model.Password).Result;
                    if (result.Succeeded)
                    {
                        //var token = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                        //var confirmationLink = Url.Action("ConfirmEmail", "Account",
                        //    new { userId = user.Id, token = token }, Request.Scheme);
                        //logger.Log(LogLevel.Warning, confirmationLink);
                        _signInManager.SignInAsync(user, false).Wait();
                        /*ViewBag.ErrorTitle = "Confirm your email";
                        ViewBag.ErrorBody = "Follow the link we have emailed you";
                        return View("Error");*/
                        return Ok(user);
                    }
                    else
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

        [HttpGet]
        [Route("profile/{id}")]
        public async Task<IActionResult> GetInfo(string id)
        {
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            User user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                var userInfo = new
                {
                    email = user.Email,
                    name = user.Name,
                    phone = user.Phone
                };
                return Ok(Json(userInfo));
            }
            return BadRequest();
        }

        [Microsoft.AspNetCore.Mvc.HttpPost]
        [Microsoft.AspNetCore.Mvc.Route("login")]
        public async Task<IActionResult> Login([Microsoft.AspNetCore.Mvc.FromBody] LoginViewModel model)
        {
            if (ModelState.IsValid)
            {
                //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
                //var identity = GetIdentity(model.Login, model.Password);
                string mySelectQuery = "SELECT id FROM user where login = '" + model.Login + "';";
                MySqlConnection myConnection = new MySqlConnection("Server=localhost;port=3306;user=root;password=root;database=mydb");
                MySqlCommand myCommand = new MySqlCommand(mySelectQuery, myConnection);
                myCommand.Connection.Open();
                var ob = myCommand.ExecuteReader();
                //var userId = new List<string>();
                var userId = "";
                while (ob.Read())
                {
                    userId = ob[0].ToString();
                }
                User user = await _userManager.FindByIdAsync(userId);
                /*while (ob.Read())
                {
                    arr.Add(ob[0].ToString() + " " + ob[1].ToString() + " " + ob[2].ToString());
                }*/

                /* var now = DateTime.UtcNow;
                 // создаем JWT-токен
                 var jwt = new JwtSecurityToken(
                         issuer: AuthOptions.ISSUER,
                         audience: AuthOptions.AUDIENCE,
                         notBefore: now,
                         claims: identity.Claims,
                         expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                         signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
                 var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);



                 var response = new
                 {
                     access_token = encodedJwt,
                     username = user.Login
                 };*/
                var userInfo = new
                {
                    id = userId,
                    username = user.Login,
                    isCompany = user.IsCompany
                };



                var result = await _signInManager.PasswordSignInAsync(model.Login, model.Password, model.RememberMe, false);

                if (result.Succeeded)
                {
                    return Ok(Json(userInfo));
                }
                return BadRequest(new AuthFailedResponse
                {
                    Message = "Invalid Login Attempt.Configuration of login and password is not valid"
                });
            }
            else
                return BadRequest(ModelState);
        }

        /* private ClaimsIdentity GetIdentity(string username, string password)
         {
             //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
             User user = User.FirstOrDefault(x => x.Login == username && x.Password == password);
             if (user != null)
             {
                 var claims = new List<Claim>
                 {
                     new Claim(ClaimsIdentity.DefaultNameClaimType, person.Login),
                     new Claim(ClaimsIdentity.DefaultRoleClaimType, person.Role)
                 };
                 ClaimsIdentity claimsIdentity =
                 new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType,
                     ClaimsIdentity.DefaultRoleClaimType);
                 return claimsIdentity;
             }

             // если пользователя не найдено
             return null;
         }*/

        [Microsoft.AspNetCore.Mvc.HttpGet]
        public ActionResult Delete()
        {
            return View();
        }

        [Microsoft.AspNetCore.Mvc.HttpPost]
        [Microsoft.AspNetCore.Mvc.Route("delete/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            User user = await _userManager.FindByIdAsync(id);
            if (user != null)
            {
                Microsoft.AspNetCore.Identity.IdentityResult result = await _userManager.DeleteAsync(user);
                if (result.Succeeded)
                    return Ok();
                else
                    return BadRequest(result.Errors);
            }
            else
                return BadRequest(ModelState);
        }

        public async Task<IActionResult> Update(string id)
        {
            User user = await _userManager.FindByIdAsync(id);
            if (user != null)
                return View(user);
            else
                return RedirectToAction("Index");
        }

        [Microsoft.AspNetCore.Mvc.HttpPost]
        [Microsoft.AspNetCore.Mvc.Route("edit/{id}")]
        public async Task<ActionResult> Update([Microsoft.AspNetCore.Mvc.FromBody] EditUserViewModel model, string id)
        {
            if (ModelState.IsValid)
            {
                //ClaimsPrincipal currentUser = this.User;
                //var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
                User user = await _userManager.FindByIdAsync(id);
                string name = (user.IsCompany == 0) ? model.Name + " " + model.Surname : model.Name;
                if (user != null)
                {
                    user.Email = model.Email;
                    user.Login = model.Login;
                    /*user.Pass = model.Password;*/
                    user.Name = name;
                    user.Phone = model.Phone;
                    user.UserName = model.Login;
                    Microsoft.AspNetCore.Identity.IdentityResult result = await _userManager.UpdateAsync(user);
                    if (result.Succeeded)
                        return Ok();
                    else
                        return BadRequest(result.Errors);
                }
                else
                    return BadRequest(Json(id));
            }
            return BadRequest("model isn't valid");
        }

        [Microsoft.AspNetCore.Mvc.HttpPost]
        [Microsoft.AspNetCore.Mvc.Route("edit/password/{id}")]
        public async Task<ActionResult> Update([Microsoft.AspNetCore.Mvc.FromBody] EditPassViewModel model, string id)
        {
            if (ModelState.IsValid)
            {
                User user = await _userManager.FindByIdAsync(id);
                if (user != null)
                {
                    user.Pass = model.NewPassword;
                    var result = await _userManager.ChangePasswordAsync(user, model.OldPassword, model.NewPassword);
                    if (result.Succeeded)
                    {
                        return Ok();
                    }
                        return BadRequest(result.Errors);
                }
                else
                    return BadRequest(Json(id));
            }
            return BadRequest("model isn't valid");
        }
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


//{

//};

