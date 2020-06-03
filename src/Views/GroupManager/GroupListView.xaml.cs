using Avalonia;
using Avalonia.Controls;
using Avalonia.Markup.Xaml;

namespace Yatsugi.Views
{
    public class GroupListView : UserControl
    {
        public GroupListView()
        {
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            AvaloniaXamlLoader.Load(this);
        }
    }
}