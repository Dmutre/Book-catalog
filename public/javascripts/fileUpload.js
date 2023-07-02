document.addEventListener('DOMContentLoaded', function() {
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginFileEncode,
    FilePondPluginImageResize
  );

  FilePond.setOptions({
    stylePanelAspectRatio: 150 / 100,
    imageResizeTargetWidth: 100,
    imageResizeTargetHeight: 150,
  });

  const inputElement = document.querySelector('input[name="cover"]');
  const pond = FilePond.create(inputElement, {
    allowImagePreview: true,
    allowImageResize: true,
    imageResizeTargetWidth: 300,
    imageResizeTargetHeight: 400,
    imageResizeMode: 'cover'
  });
});