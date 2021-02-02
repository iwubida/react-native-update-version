require "json"

package = JSON.parse(File.read(File.join(__dir__, "..", "package.json")))

Pod::Spec.new do |s|
  s.name         = "RNUpdateVersionModule"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = "https://github.com/iwubida/react-native-update-version"
  # brief license entry:
  s.license      = package["license"]
  s.author       = { package["author"]["name"] => package["author"]["email"] }
  # optional - use expanded license entry instead:
  s.platforms    = { :ios => "9.0" }
  s.source       = { :git => "https://github.com/iwubida/react-native-update-version.git", :tag => "#{s.version}" }

  s.source_files = "**/*.{h,c,m,swift}"
  s.requires_arc = true

  s.dependency "React"
  # ...
  # s.dependency "..."
end

