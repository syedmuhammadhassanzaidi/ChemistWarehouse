using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ChemistWarehouse.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ChemistWarehouse.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ChemistWarehouseContext _context;

        public ProductsController(ChemistWarehouseContext context)
        {
            _context = context;
        }

        // GET: api/<Products>
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            var result = _context.Products.ToArray();
            return result;
        }

        // GET api/<Products>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<Products>
        [HttpPost("AddProduct")]
        public string AddProduct(Product product)
        {
            _context.Products.Add(product);
            _context.SaveChanges();
            return "Product Added";
        }

        // PUT api/<Products>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<Products>/5
        [HttpDelete("Delete")]
        public string Delete(Product product)
        {
            _context.Products.Remove(product);
            _context.SaveChanges();
            return "Product Deleted";
        }
    }
}
