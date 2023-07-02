document.addEventListener('DOMContentLoaded', function() {
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileEncode,
    FilePondPluginImageResize
  );

  const inputElement = document.querySelector('input[name="coverImageName"]');
  const pond = FilePond.create(inputElement, {
    allowImagePreview: true,
    allowImageResize: true,
    imageResizeTargetWidth: 300,
    imageResizeTargetHeight: 400,
    imageResizeMode: 'cover'
    // Інші налаштування FilePond
  });
});