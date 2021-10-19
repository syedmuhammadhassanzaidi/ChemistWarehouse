using System;
using System.Collections.Generic;

#nullable disable

namespace ChemistWarehouse.Models​
{
    public partial class Product
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public decimal? Price { get; set; }
        public string ProductType { get; set; }
        public bool? Active { get; set; }
    }
}
