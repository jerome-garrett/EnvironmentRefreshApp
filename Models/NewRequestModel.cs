namespace EnvironmentRefreshApp.Models
{
    public class NewRequestModel
    {
        public string Environment { get; set; }
        public string[] DatabaseNames { get; set; }
    }
}