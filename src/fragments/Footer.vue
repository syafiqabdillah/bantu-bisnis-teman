<template>
  <div class="footer bibit-footer">
    <div id="copyright">
      © 2020, Bantuin Bisnis Teman.
    </div>
    <div id="contact">
      Developer contact: abdillah.syafiq@gmail.com
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
};
// f3e6e3
</script>

<style lang="css" scoped>
.footer {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.75rem;
  padding-top: 4px;
  padding-bottom: 4px;
}
#copyright,
#contact {
  flex-grow: 1;
}

@media (max-width: 480px) {
  .footer {
    flex-direction: column;
  }
}
</style>
