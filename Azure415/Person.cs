namespace Azure415
{
    public class Person
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public List<IFormFile>? Pictures { get; set; }
    }
}