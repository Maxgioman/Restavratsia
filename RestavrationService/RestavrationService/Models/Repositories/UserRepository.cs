﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace RestavrationService.Models.Repositories
{
    public class UserRepository : BaseRepository<User>
    {
        public UserRepository(mydbContext mydbcontext) : base(mydbcontext) { }
    }
}
