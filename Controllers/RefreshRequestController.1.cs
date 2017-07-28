using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EnvironmentRefreshApp.Models;
using System.Security.Principal;


namespace EnvironmentRefreshApp.Controllers
{
    [Route("api/[controller]")]
    public class RefreshRequestController : Controller
    {
        private readonly EnvironmentRefreshContext _context;

        public RefreshRequestController(EnvironmentRefreshContext context)
        {
            _context = context;
        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<RefreshRequestModel> Get()
        {
            return _context.RefreshRequests.Include(x => x.Databases);
        }

        // GET: api/values
        [HttpGet("{id}", Name = "GetRefreshRequest")]
        public RefreshRequestModel Get(string id)
        {
            return _context.RefreshRequests
                .Include(x => x.Databases)
                .Include(x => x.Logs)
                .SingleOrDefault(x => x.Id == id);
        }


        [HttpPost]
        public IActionResult AddRereshRequest( [FromBody] NewRequestModel newRequest) 
        {
           var newRequestId = Guid.NewGuid().ToString();
           var user = WindowsIdentity.GetCurrent().Name;
           var dbs = new List<DatabaseLogModel>();
           for(var i = 0; i < newRequest.DatabaseNames.Length; i++)
           {
             var db = new DatabaseLogModel() {
                 RefreshRequstId = newRequestId,
                 DatabaseName = newRequest.DatabaseNames[i]
             };
             dbs.Add(db);
           }

           var request = new RefreshRequestModel() 
           {
                Id = newRequestId,
                Environment = newRequest.Environment,
                Status = "Initiated",
                Requestor = user,
                ScheduleDate = DateTime.Now,
                ScheduledBy = user,
                Databases = dbs
           };
           
           _context.RefreshRequests.Add(request);
           _context.SaveChanges();
            return Ok(request);
        }
    }
}
