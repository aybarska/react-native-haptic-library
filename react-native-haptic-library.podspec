require 'json'

package = JSON.parse(File.read(File.join(__dir__, 'package.json')))
repository = package.dig('repository', 'url').to_s.sub(/^git\+/, '')

Pod::Spec.new do |s|
  s.name         = 'react-native-haptic-library'
  s.version      = package['version']
  s.summary      = package['description']
  s.homepage     = package['homepage'] || repository
  s.license      = { :type => package['license'], :file => 'LICENSE' }
  s.authors      = package['author']
  s.source       = { :git => repository, :tag => s.version.to_s }

  s.platforms    = { :ios => '13.0' }
  s.source_files = 'ios/**/*.{h,m,mm,swift}'
  s.private_header_files = 'ios/**/*.h'
  s.frameworks = 'CoreHaptics', 'UIKit'
  s.swift_version = '5.10'
  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
    'CLANG_CXX_LANGUAGE_STANDARD' => 'c++17',
  }

  if respond_to?(:install_modules_dependencies)
    install_modules_dependencies(s)
  else
    s.dependency 'React-Core'
  end
end
