using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySql.Data.MySqlClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;

namespace restavratsia1.Models.Repositories
{
    public class CustomRepository
    {
        private readonly mydbContext context;

        public CustomRepository(mydbContext context)
        {
            this.context = context;
        }

        public List<Custom> GetCustoms(User user)
        {
            var listOfCustoms = new List<Custom>();
            try
            {
                listOfCustoms = (from custom in context.Custom
                                 where custom.CheckedByModer == 1
                                 orderby custom.Title
                                 select new Custom
                                 {
                                     Image = custom.Image,
                                     Title = custom.Title,
                                     SpecializationSpecialization = custom.SpecializationSpecialization
                                 }).ToList();
                user = context.User.Where(x => x.Id == user.Id).FirstOrDefault();
                if (user.IsCompany == 0)
                {
                    foreach (var obj in listOfCustoms)
                    {
                        if (obj.UserId != user.Id)
                        {
                            listOfCustoms.Remove(obj);
                        }
                    }
                }
            }
            catch (Exception)
            {
                return null;
            }
            return listOfCustoms;
        }
        public async Task<Custom> PostCustom(Custom custom)
        {
            context.Custom.Add(custom);
            await context.SaveChangesAsync();
            return custom;
        }

        public async Task<Custom> GetParticularCustom(int customId)
        {
            return await context.Set<Custom>().FindAsync(customId);
        }


        public async Task<Custom> UpdateCustom(Custom custom)
        {
            context.Entry(custom).State = EntityState.Modified;
            await context.SaveChangesAsync();
            return custom;
        }

        public async Task<Custom> DeleteCustom(int customId)
        {
            var custom = await context.Set<Custom>().FindAsync(customId);
            if (custom == null)
            {
                return custom;
            }

            context.Set<Custom>().Remove(custom);
            await context.SaveChangesAsync();

            return custom;
        }
    }
}

//private static MySqlConnection myConnection;

//static CustomRepository()
//{
//    myConnection = new MySqlConnection("Server=localhost; port = 3306 ;user=root;password=leomessi1021;database=mydb");
//}
//        var listOfCustoms = new List<Custom>();
//            try
//            {
//                MySqlCommand myCommand = new MySqlCommand(query, myConnection);
//        myCommand.Connection.Open();
//                var ob = myCommand.ExecuteReader();
//        var arr = new List<string>();
//                while (ob.Read())
//                {
//                    var newCustom = new Custom();
//        newCustom.Image = ob[0].ToString();
//        newCustom.SpecializationSpecialization = ob[1].ToString();
//        newCustom.Title = ob[2].ToString();
//        listOfCustoms.Add(newCustom);
//                }
//}
//            catch (MySqlException)
//            {

//            }
//            catch (Exception)
//            {

//            }